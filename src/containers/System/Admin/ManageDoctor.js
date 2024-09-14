import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ManageDoctor.scss";
import * as action from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUDACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctor} from '../../../services/userService'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            listDoctors: [],
            hasOldData:false
        }
    }
    async componentDidMount() {
        this.props.fetchAllDoctorRedux()
    }
    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.listDoctorredux !== this.props.listDoctorredux) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctorredux)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevprops.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctorredux)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;


        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleSaveContentMarkdown = () => {
        this.props.saveInfoDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action:this.state.hasOldData===true? CRUDACTIONS.EDIT:CRUDACTIONS.CREATE
        
        })
        console.log('check save', this.state);

    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption }
        );
        let res= await getDetailInforDoctor(selectedOption.value);
        if(res &&res.data&&res.data.Markdown){
            let markdown=res.data.Markdown;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                contentHTML: markdown.contentHTML,
                hasOldData:true
            })
        }else{
            this.setState({
                contentMarkdown: '',
                description: '',
                contentHTML: '',
                hasOldData:false
            })
        }

        console.log('check select res',res);
        
    };
    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }
    render() {
        let { hasOldData } = this.state;
        
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Thêm doctor detail</div>
                <div className='more-info'>
                    <div className='left-contenr'>
                        <label>Chọn Bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='right-contenr'>
                        <label>Nhập thông tin</label>
                        <textarea className='form-control' rows="4"
                            value={this.state.description}
                            onChange={(event) => this.handleOnchangeDesc(event)}>abc</textarea>

                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={hasOldData===true?'save-contenr-doctor':'create-content-doctor' } onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData===true? 
                    <span>Lưu thông tin</span>
                :
                <span>Tạo thông tin</span>
               }

                    </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctorredux: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctorStart()),
        saveInfoDoctorRedux: (data) => dispatch(action.saveInfoDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

