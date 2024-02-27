import { Button } from "@shopify/polaris";
import { forwardRef } from "react";

const CreateButton = forwardRef((props, ref) => {
  return (
    <Button
      variant="primary"
      ref={ref}
      onClick={() => props.setIsShowModal(true)}
    >
      Create
    </Button>
  );
});

export default CreateButton;
