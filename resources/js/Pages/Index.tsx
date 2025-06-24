import { Head } from "@inertiajs/react";

import { WhatsAppProvider } from "@/Context";
import Layout from "@/Components/layout";
const Home = () => {
  return (
    <>
      <Head title="Welcome" />
      <WhatsAppProvider>
        <Layout />
      </WhatsAppProvider>
    </>
  );
};

export default Home;
