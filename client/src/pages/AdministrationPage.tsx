import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Charts from "../components/Charts";
import CustomersInfo from "../components/CustomersInfo";
import ProductsEdit from "../components/ProductsEdit";
import CategoriesEdit from "../components/CategoriesEdit";

const AdministrationPage = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Categories</Tab>
        <Tab>Products</Tab>
        <Tab>Customers</Tab>
        <Tab>Statistics</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CategoriesEdit />
        </TabPanel>
        <TabPanel>
          <ProductsEdit />
        </TabPanel>
        <TabPanel>
          <CustomersInfo />
        </TabPanel>
        <TabPanel>
          <Charts />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AdministrationPage;
