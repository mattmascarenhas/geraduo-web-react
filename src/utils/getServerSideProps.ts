import { GetSessionParams, getSession } from "next-auth/react";

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
