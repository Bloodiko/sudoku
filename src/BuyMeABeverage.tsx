// Buy me a *enter random preferred beverage here*! component. 
// global top right corner

const BuyMeABeverage = () => {
    return (
        <a
            style={
                {
                    position: "fixed",
                    top: "0",
                    right: "0",
                    padding: "1rem",
                    fontSize: "0.75rem",
                    zIndex: 9999
                }
            }
            href="https://paypal.me/Bastianebiko">You can support me here! </a>
    );
}

export default BuyMeABeverage;