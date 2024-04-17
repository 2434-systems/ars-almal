import { RocketIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  RadioCards,
  Strong,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useState } from "react";
import { playerEvents } from "@/util/event";
import { incrementCurrency, triggerEvent, UserData } from "@/util/firebase";
import { getUserId } from "@/util/localStorage";
import toast, { Toaster } from "react-hot-toast";

const shopOffers = [...Object.values(playerEvents)];

export default function Shop({
  isJP,
  userData,
}: {
  isJP: boolean;
  userData: UserData;
}) {
  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [selected, setSelected] = useState("0");
  const resetStates = () => {
    setSelected("0");
  };
  const getOfferFromId = (id: string) => playerEvents[id];
  const handlePurchase = async () => {
    const offer = getOfferFromId(selected);
    if (!offer) return;
    if (offer.price > userData.currency) return; // TODO: show error
    const userId = getUserId();
    await incrementCurrency(userId, -offer.price);
    await triggerEvent(userId, offer.id, offer.duration);
    setToastOpen(true);
    toast(
      () => (
        <span>
          Purchased <b>{offer.name}</b> for {offer.price} ARS
        </span>
      ),
      {
        icon: "🛍️",
      }
    );
    setOpen(false);
    resetStates();
  };
  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Toaster />
      <Tooltip content={isJP ? "入店" : "Enter the store"} side="right">
        <Box>
          <Dialog.Trigger>
            <Card asChild className="hover:bg-gray-300 active:bg-gray-600">
              <a className="hover:cursor-pointer">
                <Flex gap="3" align="center">
                  <RocketIcon />
                  <Box className="text-nowrap">
                    <Text as="div" size="2">
                      {(userData ? userData.currency : 0) || 0} ARS
                    </Text>
                  </Box>
                </Flex>
              </a>
            </Card>
          </Dialog.Trigger>
        </Box>
      </Tooltip>
      <Dialog.Content
        width={{
          initial: "14rem",
          sm: "100%",
        }}
      >
        <Dialog.Title>{isJP ? "販売店" : "ARS Store"}</Dialog.Title>
        <Dialog.Description mb="4">
          {isJP ? "ここで$ARSを使ってください!" : "Spend your $ARS here!"}
        </Dialog.Description>
        {/* <ScrollArea type="always" scrollbars="vertical" size="3"></ScrollArea> */}
        <RadioCards.Root
          defaultValue="0"
          columns={{ initial: "0", sm: "3" }}
          value={selected}
          onValueChange={(value) => setSelected(value)}
        >
          {shopOffers.map((offer) => (
            <RadioCards.Item
              key={offer.id}
              value={offer.id}
              disabled={!offer.enabled}
            >
              <Flex direction="column" width="100%">
                <Text weight="bold">{offer.name}</Text>
                <Text>{offer.description}</Text>
                <Text size="2" color="gray">
                  {offer.price} ARS
                </Text>
              </Flex>
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
        <Flex gap="3" justify="end" mt="4">
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                variant="soft"
                color="blue"
                disabled={
                  selected === "0" ||
                  userData.currency <
                    (getOfferFromId(selected)?.price || Infinity)
                }
                size="3"
              >
                Purchase
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Confirm Purchase</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to buy{" "}
                <Strong>{getOfferFromId(selected)?.name}</Strong> for{" "}
                <Strong>{getOfferFromId(selected)?.price} ARS</Strong>?
              </Dialog.Description>
              <Flex gap="3" justify="end" mt="3">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button variant="soft" color="blue" onClick={handlePurchase}>
                    Confirm
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
