// @flow
import React, {Component} from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    CheckBox
} from "react-native";
import {GalleryRealm} from "./GalleryModels";
import {
    fetchNewPhotosDataFromNetwork,
    setUpSocketforImageUpdates,
    downloadFile
} from "./GalleryUtils";
import PhotoGrid from "../Components/Modules/PhotoGrid";
import {SERVER_URL, Share} from "../../Config/Constants";
import {UploadRealm} from "../UploadActivity/UploadModel";
import MaterialIcon from "react-native-vector-icons/Entypo";

const {width} = Dimensions.get("window");
import * as Progress from 'react-native-progress';

export default class GalleryActivity extends Component {
    constructor(props) {
        super(props);
        downloadFile();
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.selectedImages = [];

        //this.imageWidth = (width - 2 * (5 + 5)) / 3;
        this.imageWidth = (width) / 3;
        this.state = {
            AlbumId: "5aec06c4ece791191adaa45a",

            //check of realm contains the album or not if yes load that album else an empty array

            pendingImages: UploadRealm.objectForPrimaryKey(
                "Album",
                //  "5aec06c4ece791191adaa45a"
                //"5afac30d70d2a60c1c3d655d"
                this.props.albumId
            ) ? UploadRealm.objectForPrimaryKey(
                "Album",
                //"5afac30d70d2a60c1c3d655d"
                // "5aec06c4ece791191adaa45a"
                this.props.albumId
            ).photos : [],
            images: GalleryRealm.objectForPrimaryKey(
                "Album",
                // "5aec06c4ece791191adaa45a"
                this.props.albumId
            )
                ? GalleryRealm.objectForPrimaryKey("Album", this.props.albumId)
                    .photos
                : [],

            multiSelect: false,
        };
    }


    static navigatorStyle = {
        drawUnderNavBar: false,
        navBarBackgroundColor: 'white',
        //navBarBlur: false,
        //navBarTransparent: true,
        navBarNoBorder: true,
        topBarElevationShadowEnabled: false
    };

    static navigatorButtons = {

        rightButtons: [
            {
                title: "Edit",
                id: "edit",
                showAsAction: "ifRoom"
            },
            {
                id: "drop",
                title: "drop",
                component: "DropDownArrow",
                passProps: {}
            }
        ]
    };


    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            console.log("dsadad")
            if (event.id === 'edit') {
                console.log("drop");
            }

        }
    }

    forceUpdateRealm = () => {
        this.forceUpdate(() => {
            console.log("forceUpdate");
        });
    };

    componentDidMount = () => {
        GalleryRealm.addListener("change", this.forceUpdateRealm);

        // fetch new data from network and put it into realm
        fetchNewPhotosDataFromNetwork(this.props.albumId, this.state.images)
            .then(() => {
                //set up socket to listen to updates
                setUpSocketforImageUpdates(this.props.albumId);

                // pass realm photos to setState in case it was empty array initially
                const images = GalleryRealm.objectForPrimaryKey(
                    "Album",
                    this.props.albumId
                ).photos;
                this.setState({images}, () => {
                    console.log("setStateTriggered=>", this.state.images);
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    componentWillUnmount = () => {
        GalleryRealm.removeListener("change", this.forceUpdateRealm);
        //maybe leave the joined subalbum group or in addition to that disconnect socket connection
    };

    onButtonPress = itemData => {
        const id = itemData.item.id;
        //console.log("button pressed", id);
        const newItems = [...this.state.items];
        newItems[id].selected = !newItems[id].selected; //toggle selected true or false

        //then insert or remove the clicked item src link to or from the selectedImagesArray
        /* const selectedImages = newItems[id].selected ?
            [...this.state.selectedImages, itemData.item.src] :
            this.state.selectedImages.filter(element => {
                return element !== itemData.item.src
            }); */
        newItems[id].selected
            ? this.props.onImageAdded(itemData.item)
            : this.props.onImageRemoved(itemData.item);
        this.setState({items: newItems});
    };

    renderFlatListItem = itemData => {
        const marker = (
            <Image
                style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "transparent",
                    width: 25,
                    height: 25
                }}
                source={require("../../Assets/Images/checked.png")}
                //require only once and try if performance imporoves
            />
        );


        //TODO:on click remove stop uploading if already in progress and then delete it from server and then from local db
        const cancel = (
            <View style={{}}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}>
                    <MaterialIcon
                        style={{
                            zIndex: 20,
                            backgroundColor: "transparent",
                            borderRadius: 24 / 2
                        }}
                        name="cross"
                        size={24}
                        color='rgba(255,255,255,0.9)'
                    />
                </View>
                <View
                    width={40}
                    height={40}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: 40 / 2,
                    }}/>
            </View>)


        console.log(this.selectedImages, "%", itemData.item.url)
        const tick = this.selectedImages.includes(itemData.item.url) ? marker : null;
        const uri = itemData.item.src
            ? itemData.item.src
            : "https://s3.us-east-2.amazonaws.com/crewal-test/" + itemData.item.url;
        console.log("itemData=>", SERVER_URL + "/" + itemData.item.url);
        return (
            //TODO ONCLICK = IT WILL OPEN IMAGE ON CLICK AND NOT GET SELECTED. MAYBE LONG PRESS TO SELECT?
            itemData.item.src ? <TouchableWithoutFeedback onPress={{/*open the image here*/}}>
                    <View style={{height: this.imageWidth, width: this.imageWidth}}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="resize"
                            style={{flex: 1}}
                            source={{
                                uri
                            }}
                        />
                        <View
                            style={{
                                flex: 1, position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.3)'
                            }}
                        />


                        <Progress.Circle thickness={3} indeterminate={false} size={35} progress={1} borderWidth={0}
                                         color={"#66BB6A"} style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}/>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {cancel}
                        </View>

                    </View>
                </TouchableWithoutFeedback> :
                <TouchableWithoutFeedback
                    onPress={this.state.multiSelect ? () => {
                        this.selectedImages.push(uri)
                    } : () => {
                        {/*open the image here*/
                        }
                    }}
                    onLongPress={() => {
                        console.log("longpressed")
                        this.setState({multiSelect: true})
                        this.selectedImages.push(uri)
                    }}>
                    <View style={{height: this.imageWidth, width: this.imageWidth}}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="resize"
                            style={{flex: 1}}
                            source={{
                                uri
                            }}
                        />
                        {this.selectedImages.includes(uri) ? marker : undefined}

                    </View>
                </TouchableWithoutFeedback>
        )
            ;
    };

    /* renderPendingImages = itemData => {
        const marker = (
            <Image
                style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "transparent",
                    width: 25,
                    height: 25
                }}
                source={require("../../Assets/Images/checked.png")}
                //require only once and try if performance imporoves
            />
        );
        const tick = itemData.item.selected ? marker : null;
        console.log("itemData=>", itemData.item);
        return (
            <TouchableWithoutFeedback onPress={() => this.onButtonPress(itemData)}>
                <View style={{ height: this.imageWidth, width: this.imageWidth }}>
                    <Image
                        resizeMode="cover"
                        resizeMethod="resize"
                        style={{ flex: 1 }}
                        source={{
                            uri: itemData.item.src
                        }}
                    />
                    {tick}
                </View>
            </TouchableWithoutFeedback>
        );
    }; */

    render() {
        let progress = 0
        if (this.state.pendingImages.length !== 0) {
            console.log(this.state.pendingImages)
            const pendingImagesLength = this.state.pendingImages.length;
            const completedImagesLength = this.state.pendingImages.filtered('uploaded = true').length;
            progress = completedImagesLength / pendingImagesLength;
        }
        console.log("render=>" + this.state.images);
        return (
            <View style={{flex: 1}}>
                <Text>{this.props.PhotosData.progress}</Text>
                <PhotoGrid
                    // combined both the peningimages and already uploaded images together and then in
                    // renderitem I checked what is the source of the image and renderd the item according to it.
                    // i.e cancel button on image currently being uploaded and upload progress while for and
                    data={[...this.state.pendingImages, ...this.state.images]}
                    renderItem={this.renderFlatListItem}
                    numColumns={3}
                />
                <View style={{
                    position: "absolute",
                    bottom: 20,
                    right: 15,
                    height: 43,
                    backgroundColor: "white",
                    width: 140,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    elevation: 4
                }}>
                    <View style={{alignItems: "center"}}>
                        <View style={{flexDirection: "row", marginBottom: 8, alignItems: "center"}}>
                            <Text style={{color: "black", fontWeight: "bold", paddingRight: 5}}>{5 + "/" + 10}</Text>
                            <Text style={{color: "black"}}>{"completed"}</Text>
                            <MaterialIcon
                                style={{marginLeft: 5, marginTop: 1}}
                                name="circle-with-cross"
                                size={15}
                            />
                        </View>
                        <Progress.Bar height={4} borderWidth={0} color={"#66BB6A"} borderRadius={0} progress={0.3}
                                      width={140}/>


                    </View>
                </View>
                {/*https://github.com/oblador/react-native-progress/issues/104*/}

                {/* 	<PhotoGrid
					data={this.state.pendingImages}
					renderItem={this.renderPendingImages}
					numColumns={3}
				/> */}
            </View>
        );
    }
}
