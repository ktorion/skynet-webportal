const isProduction = process.env.NODE_ENV === "production";

export default function authServerSideProps(getServerSideProps) {
  return function authenticate(context) {
    if (isProduction && (!("ory_kratos_session" in context.req.cookies) || !("skynet-jwt" in context.req.cookies))) {
      return {
        redirect: {
          permanent: false,
          destination: `/api/accounts/login?return_to=${encodeURIComponent(context.resolvedUrl)}`,
        },
      };
    }

    if (getServerSideProps) {
      return getServerSideProps(context);
    }

    return { props: {} };
  };
}