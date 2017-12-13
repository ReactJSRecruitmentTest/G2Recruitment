import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import Moment from 'react-moment';
import Mailto from 'react-mailto';
import FontAwesome from 'react-fontawesome';

class Personnel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Current_Email: 'not defined', Current_Tel: 'not defined',
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTelChange = this.onTelChange.bind(this);
    };

    onEmailChange(Pref_Email) {
      this.setState({ Current_Email: Pref_Email});
    }
    
    onTelChange(Pref_Email) {
      this.setState({ Current_Tel: Pref_Email});
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <img src={this.props.record.Photo} className="img-responsive topImg" alt="person_image"/>
                        <h2 className="topRef"><small>Profile - </small>{this.props.record.Reference}</h2>
                    </div>
                    
                    <div className="col-sm-6 col-md-6 ">
                        <h1 className="topName">{this.props.record.GivenName} {this.props.record.FamilyName}</h1>

                        <FontAwesome className="topIcon" name='envelope-o'/><Mailto className="prefEmail" email={this.state.Current_Email} obfuscate={true}>{this.state.Current_Email}</Mailto>

                        <h3><FontAwesome className="topIcon" name='phone'/>{this.state.Current_Tel}</h3>

                        <FontAwesome className="topIcon" name='address-book-o'/><FormatBR Items={this.props.record.HomeAddress.split(', ')} cssClass="topAddress" />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <Collapse_Arrow/>  
                        <Collapsible trigger="Email Address Options" transitionTime={100} open={true}>
                            <ListPrefItems Items={this.props.record.EmailAddresses} data={this.onEmailChange} />
                        </Collapsible>
                        <Collapse_Arrow/>  
                        <Collapsible trigger="Telephone Number Options" transitionTime={100}>
                            <ListPrefItems Items={this.props.record.TelephoneNumbers} data={this.onTelChange} />
                        </Collapsible>
                        <Collapse_Arrow/>    
                        <Collapsible trigger="Emergency Contacts" transitionTime={100}>
                                <ListContacts Items={this.props.record.EmergencyContacts} />
                        </Collapsible>
                    </div>
                    
                    <div className="col-sm-6 col-md-6">
                        <Collapse_Arrow/> 
                        <Collapsible trigger="Personal Details" transitionTime={100} open={true}>
                            <table className="pDetail">
                            <tbody>
                              <tr>
                                  <td>Gender</td><td>{this.props.record.Gender.Description}</td>
                              </tr>
                              <tr>
                                  <td>Nationality</td><td>{this.props.record.Nationality.Description}</td>
                              </tr>
                              <tr>
                                  <td>Ethnic Origin</td><td>{this.props.record.EthnicOrigin.Description}</td>
                              </tr>
                              <tr>
                                  <td>Date of Birth</td><td><FormatDate Date={this.props.record.DateOfBirth}/></td>
                              </tr>
                              <tr>
                                  <td>Current Age</td><td><GetAge Date={this.props.record.DateOfBirth}/></td>
                              </tr>
                              <tr>
                                  <td>Weight</td><td>{this.props.record.Weight} kg</td>
                              </tr>
                              <tr>
                                  <td>Height</td><td>{this.props.record.Height} cm</td>
                              </tr>
                              <tr>
                                  <td>National Insurance Number</td><td>{this.props.record.NationalInsuranceNumber}</td>
                              </tr>
                            </tbody>
                            </table>
                        </Collapsible>
                        <Collapse_Arrow/>  
                        <Collapsible trigger="Allergies" transitionTime={100} >
                            <ListItems Items={this.props.record.Allergies} />
                        </Collapsible>
                        <Collapse_Arrow/>  
                        <Collapsible trigger="Conditions" transitionTime={100}>
                            <ListItems Items={this.props.record.Conditions} />
                        </Collapsible>
                    </div>
                </div>
            </div>
        );
    }
};

class Collapse_Arrow extends React.Component {
    render() {
        return (
            <FontAwesome name='arrow-down' className="Arrow"/>
        );
    }
}

class FormatDate extends React.Component {
    render() {
        return (
            <Moment format="MMMM Do YYYY">{this.props.Date}</Moment>
        );
    }
}

class GetAge extends React.Component {
    render() {
        return (
            <div>
                <Moment fromNow ago>{this.props.Date}</Moment> old
            </div>
        );
    }
}

class FormatBR extends React.Component {
  render() {
    if(this.props.Items.length > 0){
        return (
            <div className={this.props.cssClass}>
                {this.props.Items.map((Item, index) => (
                  <p key={index}>{Item}</p>
                ))}
            </div>
        );
    } else {
        return (
          <div>n/a</div>
        );
    }
  }
}

class ListItems extends React.Component {
  render() {
    if(this.props.Items.length > 0){
        return (
          <ul>
            {this.props.Items.map((Item, index) => (
              <li key={index}>{Item.Description}</li>
            ))}
          </ul>
        );
    } else {
        return (
          <ul><li>No entries</li></ul>
        );
    }
  }
}

class GetPrefIcon extends React.Component {
    render() {
        if(this.props.type){ 
            return (
                <FontAwesome name='check'/>
            );
        } else {
            return (
                <FontAwesome name='times'/>
            );  
        }  
    }
}

class PropPrefer extends React.Component {
    render() {
        return (
          <button className="preferButton" onClick={() => this.props.onClick()}>
            <GetPrefIcon type={this.props.value}/>
          </button>
        );
    }
}

class ListPrefItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propArr: Array(this.props.Items.length).fill(false),
    }
  }
  
  componentDidMount() {
    const propArr = this.state.propArr.slice();
        for (var i = 0; i < this.props.Items.length; i++) {           
            if(this.props.Items[i].Preferred){
                propArr[i] = true;
                this.props.data(this.props.Items[i].Value)
            };
        }
    this.setState({propArr: propArr});
  }
     
  handleClick(i) {
    const propArr = this.state.propArr.slice();
        for (var j = 0; j < this.state.propArr.length; j++) {
            propArr[j] = false;
        }  
    propArr[i] = true;
   
    this.setState({propArr: propArr});

    this.props.data(this.props.Items[i].Value) 
      
  }
    
  PrefSelect(i) {
      return <PropPrefer value={this.state.propArr[i]} onClick={() => this.handleClick(i)}/>;
  }  
           
  render() {
    return (
          <table className="prefList">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th><i>preferred (click to change)</i></th>
                </tr>
            </thead>
            <tbody>
                {this.props.Items.map((Item, index) => (
                  <tr key={index}>
                        <td>{Item.Value}</td>
                        <td>{Item.Type}</td>
                        <td>{this.PrefSelect(index)}</td>
                    </tr>
                ))}
            </tbody>
          </table>
    );
  }
}

class ListContacts extends React.Component {     
  render() {
    return (
      <div>
        {this.props.Items.map((Item, index) => (
          <table key={index} className="contactRel">
            <tbody>
                <tr><td>Name</td><td>{Item.Name.GivenName} {Item.Name.FamilyName}</td></tr>
                <tr><td>Relationship</td><td>{Item.Relationship.Description}</td></tr>
                <tr><td>Address</td><td><FormatBR Items={Item.Address.split(', ')} cssClass="contactAddress" /></td></tr>
            </tbody>
                  <ListTel Items={Item.TelephoneNumbers} />
          </table>
        ))}
      </div>
    );
  }
}

class ListTel extends React.Component {
  render() {
    if(this.props.Items.length > 0){
        return (
            <tbody className="contactTel">
            {this.props.Items.map((Item, index) => (
              <tr key={index}><td>{Item.Type}</td><td>{Item.Value}</td></tr>
            ))}
            </tbody>
        );
    } else {
        return (
          <tbody className="contactTel"><tr><td>No entries</td><td></td></tr></tbody>
        );
    }
  }
}

Personnel.propTypes = {
    record: PropTypes.object.isRequired
};
module.exports = Personnel;
