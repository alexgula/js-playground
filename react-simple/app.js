var e = React.createElement;

var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired
    },

    render: function() {
        return e('li', {className: "contact"},
            e('h2', {className: "contact-name"},
                this.props.name),
            e('a', {
                    className: "contact-email",
                    href: "mailto:james@jamesknelson.com"},
                this.props.email),
            e('div', {className: "contact-description"},
                this.props.description));
    },
});

var ContactForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },

    render: function() {
        var errors = this.props.value.errors || {};

        return e('form', {
                    className: "contact-form",
                    onSubmit: this.onSubmit,
                    noValidate: true},
            e('input', {
                    className: "contact-form-input" + (errors.name ? " contact-form-error" : ""),
                    type: 'text',
                    placeholder: "Name (required)",
                    value: this.props.value.name,
                    onChange: this.onNameInput}),
            e('input', {
                    className: "contact-form-input" + (errors.email ? " contact-form-error" : ""),
                    type: 'email',
                    placeholder: "Email (required)",
                    value: this.props.value.email,
                    onChange: this.onEmailInput}),
            e('textarea', {
                    className: "contact-form-textarea" + (errors.description ? " contact-form-error" : ""),
                    placeholder: "Description",
                    value: this.props.value.description,
                    onChange: this.onDescriptionInput}),
            e('button', {
                    className: "contact-form-submit",
                    type: 'submit'},
                "Add Contact"));
    },

    onNameInput: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
    },

    onEmailInput: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}));
    },

    onDescriptionInput: function(e) {
        this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
    },

    onSubmit: function(e) {
        e.preventDefault();
        this.props.onSubmit();
    },

});

var ContactView = React.createClass({
    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        formContact: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },

    render: function() {
        return e('div', {className: "contact-container"},
            e('h1', {className: "contact-title"},
                "Contacts"),
            e('ul', {className: "contact-list"},
                this.props.contacts.map(function(c) { return e(ContactItem, c); })),
            e(ContactForm, {
                    value: this.props.formContact,
                    onChange: this.props.onChange,
                    onSubmit: this.props.onSubmit}));
    },
});

var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null};

var state = {};

function setState(changes) {
    Object.assign(state, changes);
    console.log(state);

    var root = e(ContactView, {
            contacts: state.contacts,
            formContact: state.formContact,
            onChange: function(value) {
                setState({formContact: value});
            },
            onSubmit: function() {
                var newContact = Object.assign({},
                    state.formContact,
                    {
                        key: state.contacts.length + 1,
                        errors: {}
                    });
                
                if (!newContact.name) {
                    newContact.errors.name = ["Please enter your new contact's name"];
                }
                if (!/.+@.+\..+/.test(newContact.email)) {
                    newContact.errors.email = ["Please enter your new contact's email"];
                }

                setState(
                    Object.keys(newContact.errors).length === 0 ? {
                        contacts: state.contacts.slice(0).concat(newContact),
                        formContact: CONTACT_TEMPLATE
                    } : {
                        formContact: newContact
                    });
            }
        });

    ReactDOM.render(root, document.getElementById('react-app'));
}

/*
setState({
    contacts: [
        {key: 1, name: "James Nelson", email: "mailto:james@jamesknelson.com"},
        {key: 2, name: "Joe Citisen", email: "mailto:joe@example.com"}
    ],
    formContact: CONTACT_TEMPLATE
});
*/

// Handle the initial route
navigated()

// Handle browser navigation events
window.addEventListener('hashchange', navigated, false);

function navigated() {
    // Choose which component to render based on browser URL
    var component = window.location.hash == "#/"
        ? e('div', {},
            e('p', {}, "Index page"),
            e('div', {},
                e('a', {href: "#/foo"}, "Go to foo")))
        : e('div', {},
            e('p', {}, "Not Found"),
            e('div', {},
                e('a', {href: "#/"}, "Go home")));

    // Render the new component to the page's #react-app element
    ReactDOM.render(component, document.getElementById('react-app'));
}