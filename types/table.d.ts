interface Dispa8chTable {
  headers: (string | React.ReactNode)[];
  children: React.ReactNode; // rows will be passed here
  type?: "collapsed" | "main";
  title?: string;
  rightNode?: React.ReactNode;
  action?: () => void;
  count?: number;
}

interface Dispa8chTableRow {
  one?: string | React.ReactNode;
  two?: string | React.ReactNode;
  three?: string | React.ReactNode;
  four?: string | React.ReactNode;
  five?: string | React.ReactNode;
  six?: string | React.ReactNode;
  seven?: string | React.ReactNode;
  eight?: string | React.ReactNode;
  nine?: string | React.ReactNode;
  ten?: string | React.ReactNode;
  eleven?: string | React.ReactNode;
  twelve?: string | React.ReactNode;
  thirteen?: string | React.ReactNode;
  fourteen?: string | React.ReactNode;
  fifteen?: string | React.ReactNode;
}
