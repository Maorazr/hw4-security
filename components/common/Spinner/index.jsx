import classes from "./styels.module.css";

const Spinner = () => {
  return (
    <div className={classes["spinner-container"]}>
      <div className={classes["loading-spinner"]}></div>
    </div>
  );
};

export default Spinner;
