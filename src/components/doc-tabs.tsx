import { Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // React Router hooks for URL management
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
  const navigate = useNavigate();
  const location = useLocation();

  // Get the active tab from the URL
  const activeTab = new URLSearchParams(location.search).get("tab") || props.tabs[props.defaultTabIndex ? props.defaultTabIndex : 0].path;

  useEffect(() => {
    // Update the URL when activeTab changes
    if (activeTab) {
      navigate(`?tab=${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate]);

  const handleTabChange = (tab: string) => {
    navigate(`?tab=${tab}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
        <TabsList className="lg:*:w-32">
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

