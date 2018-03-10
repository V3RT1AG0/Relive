// @flow
import { connect } from "react-redux";
import { loadInitialTimeline } from "./TimelineActions";
import TimeLineMain from "./TimelineMain";

const mapDispatchToProps = dispatch => ({
	getInitialTimeline: () => dispatch(loadInitialTimeline())
});

const mapStateToProps = state => ({ timelineData: state.timeline });

const TimeLineContainer = connect(mapStateToProps, mapDispatchToProps)(
	TimeLineMain
);

export default TimeLineContainer;
