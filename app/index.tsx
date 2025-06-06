import { Redirect } from "expo-router";

export default function Index() {
  // This redirects from the root to the appropriate stack
  return <Redirect href="/(unauthenticated)/login" />;
}
