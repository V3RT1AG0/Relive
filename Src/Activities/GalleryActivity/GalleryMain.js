// @flow
import React, {Component} from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import {GalleryRealm} from "./GalleryModels";
import {
    fetchNewPhotosDataFromNetwork,
    setUpSocketforImageUpdates
} from "./GalleryUtils";
import PhotoGrid from "../Components/Modules/PhotoGrid";
import {SERVER_URL, Share} from "../../Config/Constants";
import {UploadRealm} from "../UploadActivity/UploadModel";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
const {width} = Dimensions.get("window");

export default class GalleryActivity extends Component {
    constructor(props) {
        super(props);
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.selectedImages = [];
        this.imageWidth = (width - 2 * (5 + 5)) / 3;
        this.state = {
            AlbumId: "5aec06c4ece791191adaa45a",

            //check of realm contains the album or not if yes load that album else an empty array

            pendingImages: UploadRealm.objectForPrimaryKey(
                "Album",
                "5aec06c4ece791191adaa45a"
            )? UploadRealm.objectForPrimaryKey(
                "Album",
                "5aec06c4ece791191adaa45a"
            ).photos:[],
            images: GalleryRealm.objectForPrimaryKey(
                "Album",
                "5aec06c4ece791191adaa45a"
            )
                ? GalleryRealm.objectForPrimaryKey("Album", "5aec06c4ece791191adaa45a")
                    .photos
                : [],

            multiSelect: false,
        };
    }

    onNavigatorEvent(event) {
        // this is the onPress handler for the two buttons together
        if (event.type == "NavBarButtonPress") {
            // this is the event type for button presses
            if (event.id == "drop") {
            }
        }
    }

    static navigatorButtons = {
        rightButtons: [
            /* {
                title: "Edit",
                id: "edit",
                showAsAction: "ifRoom"
            }, */
            {
                id: "drop",
                component: "DropDownArrow"
            }
        ]
    };

    forceUpdateRealm = () => {
        this.forceUpdate(() => {
            console.log("forceUpdate");
        });
    };

    componentDidMount = () => {
        GalleryRealm.addListener("change", this.forceUpdateRealm);

        // fetch new data from network and put it into realm
        fetchNewPhotosDataFromNetwork(this.state.AlbumId, this.state.images)
            .then(() => {
                //set up socket to listen to updates
                setUpSocketforImageUpdates(this.state.AlbumId);

                // pass realm photos to setState in case it was empty array initially
                const images = GalleryRealm.objectForPrimaryKey(
                    "Album",
                    "5aec06c4ece791191adaa45a"
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
        const cancel = (<MaterialIcon
            style={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "transparent",
                width: 25,
                height: 25
            }}
            name="cancel"
            size={25}
            color="#900"
        />)

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
                         {cancel}
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
                        {tick}

                    </View>
                </TouchableWithoutFeedback>
        );
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
        console.log("render=>" + this.state.images);
        return (
            <View>
                <Text>{this.props.PhotosData.progress}</Text>
                <PhotoGrid
                    // combined both the peningimages and already uploaded images together and then in
                    // renderitem I checked what is the source of the image and renderd the item according to it.
                    // i.e cancel button on image currently being uploaded and upload progress while for and
                    data={[...this.state.images, ...this.state.pendingImages]}
                    renderItem={this.renderFlatListItem}
                    numColumns={3}
                />

                {/* 	<PhotoGrid
					data={this.state.pendingImages}
					renderItem={this.renderPendingImages}
					numColumns={3}
				/> */}
            </View>
        );
    }
}
