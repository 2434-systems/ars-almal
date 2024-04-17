import { Switch, Tooltip } from "@radix-ui/themes";

export default function Settings({
  onCheckedChange,
  isJP,
}: {
  onCheckedChange: (checked: boolean) => void;
  isJP: boolean;
}) {
  return (
    <>
      <Tooltip
        content={isJP ? "言語を切り替える" : "Switch language"}
        side="bottom"
      >
        <Switch
          size="3"
          className="hover:cursor-pointer z-1"
          onCheckedChange={onCheckedChange}
          variant="soft"
        />
      </Tooltip>
      {isJP ? " JP" : " EN"}
    </>
  );
}
