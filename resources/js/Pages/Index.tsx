import { Head } from "@inertiajs/react";

import { WhatsAppProvider } from "@/Context";
import Layout from "@/Components/layout";
import { ThemeProvider } from "@/Components/theme-provider";
const Home = () => {
  return (
    <>
      <Head title="Welcome" />
      <ThemeProvider defaultTheme="system">
        <WhatsAppProvider>
          <Layout />
        </WhatsAppProvider>
      </ThemeProvider>
    </>
  );
};

export default Home;
