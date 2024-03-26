/* eslint-disable @next/next/no-img-element */
import {
  FaSolarPanel,
  FaRegLightbulb,
  FaCircleCheck,
  FaRegEye,
} from "react-icons/fa6";
import {
  IoArrowUpCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import DOMPurify from "dompurify";

interface ProductCardProps {
  logo?: string;
  plan_name: string;
  billing_options: string;
  daily_supply_charges: number;
  plan_rate_limits_description: string;
  expected_bill_amount?: number;
  expected_monthly_bill_amount?: number;
  view_discount?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  logo,
  plan_name,
  billing_options,
  daily_supply_charges,
  plan_rate_limits_description,
  expected_bill_amount,
  expected_monthly_bill_amount,
  view_discount,
}) => {
  return (
    <div className="rounded-lg shadow-md min-w-[900px] max-w-[900px] overflow-hidden bg-white pb-6">
      {view_discount !== null && (
        <div
          className={`bg-[#003459] p-3 flex items-center gap-3 ${
            view_discount === "" ? "hidden" : "visible"
          }`}
        >
          <h1 className="text-white font-bold text-md">Inclusions</h1>
          <div className="rounded-full bg-white flex items-center gap-1 px-1">
            <FaRegLightbulb size={12} />
            <span className="text-[10px]">Electricity</span>
          </div>
          <div className="flex items-center gap-1 ">
            <FaCircleCheck size={12} color="#00A7E7" />
            <p
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
              className="flex items-center gap-1 text-[10px] text-white"
            ></p>
          </div>
        </div>
      )}
      <div className="p-6 flex gap-4">
        <img
          src={logo || "/path/to/default/image.png"}
          className="w-[100px] h-[45px] mr-8"
          alt="logo"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm">{plan_name}</h1>
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-white flex items-center gap-1 px-1 border border-[#00A7E7]">
              <FaRegLightbulb size={12} />
              <span className="text-[10px]">Electricity</span>
            </div>
            <div className="rounded-full bg-white flex items-center gap-1 px-1 border border-[#00A7E7]">
              <FaSolarPanel size={12} />
              <span className="text-[10px]">Solar</span>
            </div>
          </div>
          <p className="text-[10px] text-[#00A7E7] flex items-center gap-1 cursor-pointer font-medium">
            <span>
              <IoArrowUpCircleOutline color="#00A7E7" size={12} />
            </span>
            Basic Plan Information Document
          </p>
          <p className="text-[10px] text-[#00A7E7] flex items-center gap-1 cursor-pointer font-medium">
            <span>
              <FaRegEye color="#00A7E7" size={12} />
            </span>
            View Details
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold flex items-center gap-1">
            <span>
              <FaCircleCheck size={12} color="#00A7E7" />
            </span>
            No Exit Fees
          </p>
          <p className="text-[10px] font-semibold flex items-center gap-1">
            <span>
              <FaCircleCheck size={12} color="#00A7E7" />
            </span>
            {billing_options}
          </p>
          <p className="text-[10px] font-semibold flex items-center gap-1">
            <span>
              <FaCircleCheck size={12} color="#00A7E7" />
            </span>
            No extra fees for credit card payments
          </p>
          <p className="rounded-full bg-[#E5F8FF] max-w-max text-[10px] font-semibold px-2">
            Daily Supply Charge: {daily_supply_charges}c/day
          </p>
          <p className="rounded-full bg-[#E5F8FF] max-w-max text-[10px] font-semibold px-2">
            Peak Usage: 35.97c/kWh
          </p>
          <p className="text-[10px] font-medium text-[#00A7E7] flex items-center gap-1 cursor-pointer">
            View All Applicable Rates
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#F5F5F5] flex flex-col rounded-md p-2">
            <h1 className="text-lg font-bold">23% less than</h1>
            <p className="text-[10px] text-[#AAAAAA]">
              the current reference price
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#F5F5F5] flex flex-col rounded-md p-2">
              <h1 className="text-[10px] uppercase flex items-center">
                estimated cost{" "}
                <span>
                  <IoInformationCircleOutline size={10} />
                </span>
              </h1>
              <p className="text-[10px] font-semibold">
                <span className="text-lg font-bold">
                  ${expected_monthly_bill_amount}
                </span>
                /month
              </p>
            </div>
            <div className="bg-[#F5F5F5] flex flex-col rounded-md p-2">
              <h1 className="text-[10px] uppercase flex items-center">
                estimated cost{" "}
                <span>
                  <IoInformationCircleOutline size={10} />
                </span>
              </h1>
              <p className="text-[10px] font-semibold">
                <span className="text-lg font-bold">
                  ${expected_bill_amount}
                </span>
                /year
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-[#FDA112] font-semibold text-sm text-white px-8 py-2 rounded-[4px]">
          Switch & Save Today
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
