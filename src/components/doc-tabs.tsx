import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListSkeleton from "./list-skeleton";
import { Input } from "./ui/input";
import { Sliders } from "lucide-react";
import { Button } from "./ui/button";

interface Tab {
  component: React.ReactNode;
  path: string;
  label: string;
}

interface DocTabsProps {
  tabs: Tab[];
  defaultTabIndex?: number;
}

export default function DocTabs(props: DocTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Tabs defaultValue={props.tabs[props.defaultTabIndex || 0].path}value={activeTab} onValueChange={handleTabChange}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
        <TabsList className="md:*:w-32 *:min-w-24">
          {
            props.tabs.map((tab) => (
              <TabsTrigger key={tab.path} value={tab.path}>{tab.label}</TabsTrigger>
            ))
          }
        </TabsList>
        <section className="tools flex items-center gap-2">
          <Button size="icon" variant="secondary">
            <Sliders />
          </Button>
          <Input placeholder="Search..." />
        </section>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        {
          props.tabs.map((tab) => (
            <TabsContent key={tab.path} value={tab.path}>
              {tab.component}
            </TabsContent>
          ))
        }
      </Suspense>
    </Tabs>
  );
}

