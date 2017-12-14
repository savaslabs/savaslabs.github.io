import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Editor, EditorState, RichUtils} from 'draft-js';

// Custom overrides for inline code style.
const styleMap = {
  CODE: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '.2em',
    color: '#9e023b',
    fontFamily: 'Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace',
    fontSize: '.9em',
    lineHeight: '1.5em',
    margin: '-1px 0',
    padding: '.15em .3em',
  },
};

/**
 * Set up classes for block style elements.
 *
 * @param block
 * @returns {*}
 */
function getBlockStyle(block) {
  switch (block.getType()) {
  case 'blockquote':
    return 'text-editor__editor__blockquote';
  default:
    return null;
  }
}

/**
 * The individual editor buttons that toggle text styles.
 */
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }
  render() {
    let className = 'text-editor__style-button';
    if (this.props.active) {
      className += ' text-editor__style-button--active';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * Define block-level style buttons.
 */
const BLOCK_TYPES = [
  {label: 'Heading', style: 'header-three'},
  {label: 'Bullets', style: 'unordered-list-item'},
  {label: 'Numbers', style: 'ordered-list-item'},
  {label: 'Quote', style: 'blockquote'},
  {label: 'Code block', style: 'code-block'},
];

/**
 * The row of style buttons that toggle block styles (e.g. headings, code).
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
function BlockStyleControls (props) {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="text-editor__controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
}

BlockStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

/**
 * Define inline style buttons.
 */
const INLINE_STYLES = [
  {label: 'B', style: 'BOLD'},
  {label: 'I', style: 'ITALIC'},
  {label: 'U', style: 'UNDERLINE'},
  {label: 'Inline code', style: 'CODE'},
];

/**
 * The row of style buttons that toggle inline styles (e.g. bold, italic).
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="text-editor__controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

/**
 * The text editor component.
 */
class TextEditor extends Component {
  constructor(props) {
    super(props);

    // Initialize state.
    this.state = { editorState: EditorState.createEmpty() };

    // Bind functions.
    this.focus = this.focus.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = this.onTab.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }
  focus() {
    this.editorRef.focus();
  }
  handleEditorChange(editorState) {
    this.setState({editorState: editorState});
    this.props.setEditorState(this.state.editorState);
  }
  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleEditorChange(newState);
      return true;
    }
    return false;
  }
  onTab(e) {
    const maxDepth = 4;
    this.handleEditorChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  toggleBlockType(blockType) {
    this.handleEditorChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  toggleInlineStyle(inlineStyle) {
    this.handleEditorChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  render () {
    const { editorState } = this.state;
    let ref = (el) => this.editorRef = el;

    return(
      <div className='text-editor'>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className='text-editor__editor' onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleEditorChange}
            onTab={this.onTab}
            ref={ref}
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  setEditorState: PropTypes.func.isRequired,
};

export default TextEditor;
