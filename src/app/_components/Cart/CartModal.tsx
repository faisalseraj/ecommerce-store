import "swiper/css";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { Box, ButtonGroup, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

import BillingInfo from "./Billing";
import ButtonComponent from "@/components/Buttons/Button";
import DialogComponent from "@/components/Modal/DialogComponent";
import { EffectCoverflow } from "swiper/modules";
import InputComponent from "@/components/Inputs/CustomInputField";
import { Item } from "./Item";
// CartModal.tsx
import { useCart } from "@/app/_context/CartContext";

const CartModal = ({ isOpen, onOpenChange }: any) => {
  const {
    cart,
    clearCart,
    userDetails,
    setUserDetails,
    placeOrder,
    isPlacingOrder,
  } = useCart();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <DialogComponent
      onOpenChange={onOpenChange}
      title="Order"
      isOpen={isOpen}
      size="lg"
    >
      <div>
        {cart.length === 0 ? (
          <Text>Your cart is empty!</Text>
        ) : (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            style={{ padding: "20px" }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {cart.map((item, index) => (
              <SwiperSlide style={{ zIndex: index }} key={item.productId?._id}>
                <Item item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <BillingInfo />{" "}
        <Box mt={4} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
          <InputComponent
            label="Your Full Name"
            placeholder="Your Full Name"
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
            required
          />
          <InputComponent
            label="Your Phone Number"
            placeholder="Your Phone Number"
            value={userDetails.phoneNumber}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phoneNumber: e.target.value })
            }
            required
          />
          <InputComponent
            label="Your Email"
            placeholder="Your Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            required
          />
          <InputComponent
            placeholder="Your Address"
            label="Your Address"
            value={userDetails.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
            required
          />
        </Box>
        <ButtonGroup justifyContent={"space-between"} w="100%">
          <ButtonComponent
            className="gradient-btn"
            mt={4}
            onClick={handleClearCart}
          >
            Clear Cart
          </ButtonComponent>
          <ButtonComponent
            className="gradient-btn"
            background={"green.400"}
            mt={4}
            loading={isPlacingOrder}
            onClick={() => placeOrder()}
          >
            Checkout
          </ButtonComponent>
        </ButtonGroup>
      </div>
    </DialogComponent>
  );
};

export default CartModal;
