Features:

    1. Using NextJs api routes.
    2. Using Typescipt for enhanced type safety.
    3. Using tailwind css for significantly faster development process.
    4. Using axios for more concise and easy to understand syntax with more features.
    5. Using lodash throttle to facilitate infinite scrolling and limiting the api calls.
    6. Created card view by dynamic data mapping wherever possible.
    7. Generated Token on the server side and saved it on the http only cookies from next/headers.
    8. Added token expiry check by decoding the jwt token and then calculated the expiry time and refresh if expired.
    9. Token only gets fetched if not already exists and not expired.
    10. Conditional rendering in the cards to only show the elements which are available to the specific field like special offer etc.
    11. Added loading spinner when data is being loaded/fetched.
    12. Used date-fns-tz library to convert token expiry timezone to work with the server timezone.
    13. Graceful error handling all over the application.
    14. Could have done much better than this if I had been given more time.
