import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEdu } from "../../actions/profile";

const Education = ({ education, deleteEdu }) => {
  const educations = education.map((item) => (
    <tr key={item._id}>
      <td>{item.school}</td>
      <td className="hide-sm">{item.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
        {!item?.to === null ? (
          " Now "
        ) : (
          <Moment format="YYYY/MM/DD">{item.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteEdu(item._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Scholl</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEdu: PropTypes.func.isRequired,
};

export default connect(null, { deleteEdu })(Education);
