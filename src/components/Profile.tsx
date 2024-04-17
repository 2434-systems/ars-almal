import { Cross2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Flex, Text, Tooltip, Dialog, Card, Box } from "@radix-ui/themes";
import {
  Card as ShadCard,
  CardContent as ShadCardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserData } from "@/util/firebase";

export default function Profile({
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
          <Card asChild className="hover:bg-indigo-300 active:bg-indigo-600">
            <a className="hover:cursor-pointer">
              <Flex gap="3" align="center">
                <PersonIcon />
                <Box className="text-nowrap">
                  <Text as="div" size="2">
                    Profile
                  </Text>
                </Box>
              </Flex>
            </a>
          </Card>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Profile</Dialog.Title>
        <Dialog.Description size="2">
          Select Ars&apos; outfit!
        </Dialog.Description>
        <div className="w-full h-full flex flex-col justify-center items-center mt-4">
          <Carousel className="w-1/2 max-w-xs">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <ShadCard>
                      <ShadCardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </ShadCardContent>
                    </ShadCard>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Dialog.Close>
          <button
            className="text-violet-900 hover:bg-violet-100 focus:shadow-violet-300 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none z-20"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
