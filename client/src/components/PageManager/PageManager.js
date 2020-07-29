import React from "react";
import Button from "../UI/Button/Button";
import classes from "./PageManager.module.css";
import { useStore } from "../../hooks-store/store";

const PageManager = (props) => {
  const [state, dispatch] = useStore(false);

  return (
    <div className={classes.PageManager}>
      {state.offset > 0 && (
        <Button clicked={() => dispatch("PREV_PAGE")} btnType="Info ">
          Previous
        </Button>
      )}
      {state.offset <= 973 && (
        <Button clicked={() => dispatch("NEXT_PAGE")} btnType="Info ">
          Next
        </Button>
      )}
    </div>
  );
};
export default PageManager;
