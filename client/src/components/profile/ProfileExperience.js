import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  item: { company, title, location, current, from, to, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {current ? (
        <Fragment>Now</Fragment>
      ) : (
        <Moment format="DD/MM/YYYY">{to}</Moment>
      )}
    </p>
    <p>
      <strong>Position:</strong> {title}
    </p>
    <p>
      <strong>Description:</strong>{" "}
      {description ? <span>{description}</span> : "No description"}
    </p>
  </div>
);
ProfileExperience.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProfileExperience;
