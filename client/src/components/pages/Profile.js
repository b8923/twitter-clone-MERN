import React, { useEffect, Fragment } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { connect } from "react-redux";

import TweetCard from "../components/TweetCard";
import { getProfile } from "../../actions/profileAction";
import Spinner from "../layout/Spinner";

const Profile = ({
  match,
  history,
  getProfile,
  tweets,
  user,
  profile,
  loading,
}) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);

  const handleClick = () => {
    history.goBack();
  };

  const tweetsDisplay = tweets.length ? (
    <Fragment>
      <h2 className="display-4">@{tweets[0].user.handle}</h2>
      <p className="lead">User has {tweets.length} Tweets:</p>
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} user={user} />
      ))}
    </Fragment>
  ) : (
    <p className="lead">User has no tweets</p>
  );

  const userProfile = (
    <Fragment>
      <Image
        width="200"
        className="d-block"
        src={process.env.PUBLIC_URL + `/uploads/users/${profile.photo}`}
        roundedCircle
      />
      {profile.user && (
        <h3>
          <strong>HANDLE: @</strong>
          {profile.user.handle}
        </h3>
      )}
      {!!profile.name && (
        <h4>
          <strong>NAME: </strong>
          {profile.name}
        </h4>
      )}
      {!!profile.bio && (
        <p className="lead">
          <strong>BIO: </strong>
          {profile.bio}
        </p>
      )}
    </Fragment>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <Button className="my-3" variant="secondary" onClick={handleClick}>
          GO BACK
        </Button>
        {userProfile}
        {tweetsDisplay}
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tweets, auth: { user }, loading, profile }) => ({
  tweets,
  user,
  loading,
  profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
