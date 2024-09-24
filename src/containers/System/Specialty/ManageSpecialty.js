import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils/";
import "./ManageSpecialty.scss";
import { postCreateNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevprops, prevState, snapshot) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };
    handleOnchangeInput = (event, id) => {
        let stateCoppy = { ...this.state };
        stateCoppy[id] = event.target.value;
        this.setState({
            ...stateCoppy,
        });
    };
    handleOnChangeImage = async event => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let objectUrl = URL.createObjectURL(file);

            this.setState({
                // priviewImgUrl: objectUrl,
                imageBase64: base64,
            });
        } else {
            console.log("check data file not found");
        }
    };
    handleSaveNewSpecialty = async () => {
        let res = await postCreateNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success("add new specialty success");
            this.setState({
                name: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            toast.error("Something wrongs...");
            console.log("res", res);
        }
    };
    render() {
        console.log("statetstet", this.state);

        return (
            <>
                <div className="manage-specialty-container">
                    <div className="title">Quan ly chuyen khoa</div>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>Ten phong kham</label>
                            <input
                                value={this.state.name}
                                onChange={event => this.handleOnchangeInput(event, "name")}
                                className="form-control"
                            ></input>
                        </div>
                        <div className="col-6 form-group custom-file">
                            <label>img</label>
                            <input
                                type="file"
                                onChange={event => this.handleOnChangeImage(event)}
                                className="custom-file-input"
                            ></input>
                        </div>
                        <div className="col-12 mdEditer-specialty">
                            <MdEditor
                                style={{ height: "50vh" }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 btn-save-specialty">
                            <button onClick={() => this.handleSaveNewSpecialty()}>save</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
