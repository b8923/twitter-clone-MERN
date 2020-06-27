import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Row, Col } from "react-bootstrap";

import { getTweets } from "../../actions/tweetActions";
import TweetForm from "../components/TweetForm";
import TweetCard from "../components/TweetCard";
import Spinner from "../layout/Spinner";

const Home = ({ getTweets, auth, tweets }) => {
  useEffect(() => {
    getTweets();
  }, [getTweets]);

  return tweets.length ? (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <TweetForm />
        <div className="p-4">
          {tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
          ))}
        </div>
      </Col>
    </Row>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ auth, tweets }) => ({ auth, tweets });

export default connect(mapStateToProps, { getTweets })(Home);
