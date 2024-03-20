import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import axios from "axios";

import ProductCard from "./ProductCard";
import { useInfiniteScroll } from "../_hooks/useInfiniteScroll";
import { LoadingIcon } from "./LoadingIcon";

interface Provider {
  user_id: number;
  logo?: string;
}

interface RateLimit {
  description: string;
}

interface Rate {
  daily_supply_charges: number;
  plan_rate_limits: RateLimit[];
}

interface Plan {
  provider_id: number;
  plan_name: string;
  billing_options: string;
  rates: Rate;
  view_discount?: string;
  expected_bill_amount: number;
  expected_monthly_bill_amount: number;
}

interface ElectricityDetail {
  id: number;
  expected_bill_amount: number;
  expected_monthly_bill_amount: number;
}

interface Product {
  logo?: string;
  plan_name: string;
  billing_options: string;
  daily_supply_charges: number;
  plan_rate_limits_description: string;
  expected_bill_amount?: number;
  expected_monthly_bill_amount?: number;
  view_discount?: string;
}

interface Providers {
  [key: string]: Provider;
}

interface AllPlans {
  [key: string]: Plan;
}

interface DataStructure {
  providers: Providers;
  All_plans: { electricity: AllPlans };
  electricity: ElectricityDetail[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    const nextProducts = products.slice(0, (nextPage + 1) * productsPerPage);
    setVisibleProducts(nextProducts);
    setCurrentPage(nextPage);
  };

  useInfiniteScroll(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreProducts();
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching the token
        const tokenResponse = await axios.post("/api/generateToken");
        if (tokenResponse.status !== 200)
          throw new Error("Failed to fetch token");

        // fetching the products
        const productsResponse = await axios.post("/api/getProducts");
        if (productsResponse.status !== 200)
          throw new Error("Network response was not ok");

        const data = productsResponse.data as { data: DataStructure };

        if (!data.data) throw new Error("Data is not in the expected format");

        const { providers, All_plans, electricity } = data.data;
        if (!providers || !All_plans.electricity || !electricity) {
          throw new Error("Missing data fields");
        }

        const allPlans = Object.values(All_plans.electricity);

        const productsList: Product[] = allPlans.map((plan: Plan) => {
          const provider = providers[plan.provider_id.toString()];

          return {
            logo: provider?.logo,
            plan_name: plan.plan_name,
            billing_options: plan.billing_options,
            daily_supply_charges: plan.rates.daily_supply_charges,
            plan_rate_limits_description: plan.rates.plan_rate_limits
              .map((rateLimit) => rateLimit.description)
              .join(", "),
            expected_bill_amount: plan.expected_bill_amount,
            expected_monthly_bill_amount: plan.expected_monthly_bill_amount,
            view_discount: plan.view_discount,
          };
        });

        setProducts(productsList);
        setVisibleProducts(productsList.slice(0, productsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <LoadingIcon />
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 items-center">
      {visibleProducts.map((product, index) => (
        <ProductCard
          key={index}
          logo={product.logo}
          plan_name={product.plan_name}
          billing_options={product.billing_options}
          daily_supply_charges={product.daily_supply_charges}
          plan_rate_limits_description={product.plan_rate_limits_description}
          expected_bill_amount={product.expected_bill_amount}
          expected_monthly_bill_amount={product.expected_monthly_bill_amount}
          view_discount={product.view_discount}
        />
      ))}
    </div>
  );
}
