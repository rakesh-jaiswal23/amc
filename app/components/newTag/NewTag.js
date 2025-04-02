import PropTypes from "prop-types";
import styles from "./NewTag.module.css";

function NewTag({ paddingValue }) {
  return (
    <span className={styles.newTag} style={{ padding: paddingValue || "4px" }}>
      New
    </span>
  );
}

NewTag.propTypes = {
  paddingValue: PropTypes.string,
};

NewTag.defaultProps = {
  paddingValue: "4px",
};

export default NewTag;
