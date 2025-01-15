import { LucideProps, icons } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
};

export const LucideIcon = ({ name, ...props }: IconProps): React.JSX.Element | null => {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found in lucide-react.`);
    return null;
  }

  return <Icon {...props} />;
};