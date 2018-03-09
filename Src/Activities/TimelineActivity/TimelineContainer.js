// @flow
import { connect } from "react-redux";
import { loadInitialTimelineAC } from "./TimelineActions";
import TimeLineMain from "./TimelineMain";

const mapDispatchToProps = dispatch => ({
	getInitialTimeline: data => dispatch(loadInitialTimelineAC(data))
});

const mapStateToProps = state => ({ timelineData: state.timeline });

const TimeLineContainer = connect(mapStateToProps, mapDispatchToProps)(
	TimeLineMain
);

export default TimeLineContainer;
