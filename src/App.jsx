import DataAnalysis from "./components/modules/Analysis/DataAnalysis";
import DataTable from "./components/modules/Table/DataTable";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

const App = () => {
  return (
    <div className="w-full h-full p-3">
      <p className="flex text-black text-2xl font-semibold justify-center ">
        Document Analyzer
      </p>

      <Tabs defaultValue="main" className="w-[400px] text-black">
        <TabsList className="bg-gray-300 gap-1">
          <TabsTrigger
            value="main"
            className="bg-gray-300 text-black hover:bg-black/20 "
          >
            Main View
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="bg-gray-300 text-black hover:bg-black/20"
          >
            Data Table
          </TabsTrigger>
        </TabsList>

        {/* <TabsContent value="main">
          <DataAnalysis />
        </TabsContent>
        <TabsContent value="table">
          <DataTable />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default App;
