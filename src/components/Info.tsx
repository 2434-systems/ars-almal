import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Text,
  Table,
  Tooltip,
  Dialog,
  Inset,
  Button,
  Card,
  Box,
} from "@radix-ui/themes";
import { UserData } from "@/util/firebase";

export default function Info({
  isJP,
  userData,
}: {
  isJP: boolean;
  userData: UserData;
}) {
  return (
    <Dialog.Root>
      <Tooltip content={isJP ? "情報" : "Information"} side="right">
        <Dialog.Trigger>
          <Card asChild className="hover:bg-blue-300 active:bg-blue-600">
            <a className="hover:cursor-pointer">
              <Flex gap="3" align="center">
                <InfoCircledIcon />
                <Box className="text-nowrap">
                  <Text as="div" size="2">
                    Info
                  </Text>
                </Box>
              </Flex>
            </a>
          </Card>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{isJP ? "情報" : "Information"}</Dialog.Title>
        <Dialog.Description size="2">
          <span>
            <a
              href="https://www.youtube.com/@ArsAlmal"
              className="text-blue-400"
            >
              {isJP ? "アルス・アルマル" : "Ars Almal"}
            </a>
            {isJP
              ? "はにじさんじ所属のバーチャルYouTuberです。とてもかわいい小さな頭を持っていますが、どれくらい大きくなるのでしょうか?"
              : " is a Virtual Youtuber affiliated with Nijisanji. She has a very cute and tiny face. But how big can she go?"}
          </span>
        </Dialog.Description>
        <Inset side="x" my="4">
          <Table.Root size="2">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {isJP ? "統計情報" : "Statistics"}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {isJP ? "値" : "Value"}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>
                  {isJP ? "クリック数" : "Your clicks"}
                </Table.RowHeaderCell>
                <Table.Cell>{userData ? userData.counter : 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.RowHeaderCell>
                  {isJP ? "進歩" : "Your progress"}
                </Table.RowHeaderCell>
                <Table.Cell>
                  {(userData ? userData.progress : 0) / 100000}km
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Inset>

        {/* <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div> */}
        <Flex direction="column" gap="3">
          <Text as="div" size="1" mb="1" weight="bold" color="gray">
            Made with ❤️ by <a href="https://x.com/eightyzy">80</a>
          </Text>
        </Flex>
        <Dialog.Close>
          <button
            className="text-blue-900 hover:bg-blue-100 focus:shadow-blue-300 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none z-20"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
