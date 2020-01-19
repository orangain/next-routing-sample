import { traceNavigation } from "../src/util/router";

type MyAppProps = {
  Component: any;
  pageProps: any;
};

traceNavigation();

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
