import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useWallet } from "/Users/letitiagilbert/web3-login/src/WalletContext.js";

function ConnectWalletButton() {
    const { account, connect, disconnect } = useWallet();
    const toast = useToast();

    const handleClick = async () => {
    try {
        if (account) {
            disconnect();
            toast({
            title: "Disconnected",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
        } else {
            await connect();
            toast({
            title: "Wallet Connected",
            description: "You're now logged in",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        }
    } catch (err) {
        toast({
        title: "Connection Failed",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
    });
    }
};

    return (
    <Button
        size="lg"
        colorScheme="pink"
        bg="brand.100"
        _hover={{ bg: "brand.200" }}
        onClick={handleClick}
    >
        {account ? `Logout (${account.slice(0, 6)}...)` : "Connect Wallet"}
    </Button>
    );
}

export default ConnectWalletButton;
