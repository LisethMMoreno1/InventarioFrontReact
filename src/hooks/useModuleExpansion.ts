// hooks/useModuleExpansion.ts
import { useState } from "react";
import { RouteType } from "../routes/route";

export function useModuleExpansion(routes: RouteType[]) {
  const [expandedModule, setExpandedModule] = useState<RouteType | null>(null);
  const [expandedSubmodule, setExpandedSubmodule] = useState<string | null>(null);

  const toggleModuleExpansion = (module: RouteType) => {
    setExpandedModule((prevModule) => (prevModule === module ? null : module));
  };

  const toggleSubmoduleExpansion = (submoduleName: string) => {
    setExpandedSubmodule((prevSubmodule) => (prevSubmodule === submoduleName ? null : submoduleName));
  };

  return {
    expandedModule,
    expandedSubmodule,
    toggleModuleExpansion,
    toggleSubmoduleExpansion,
  };
}
