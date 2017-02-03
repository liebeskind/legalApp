import React, {Component} from 'react';

import directorsAndOfficersPanel from ''
import directorsAndOfficers from '../components/DirectorsAndOfficersPanel';


export default class DirectorsAndOfficers extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel space-4" ng-repeat = "instructor in instructorsPulled" ng-show = "instructor._id != returnedInstructor._id">
        <div className="panel-header">
          {{instructor.firstName}} {{instructor.lastName}}
          <ul className="panel-action-list">
            <li>
              <a href="#" className="panel-action-item" ng-click = "editInstructor(instructor); scrollTop();">Edit</a>
            </li>
            <li>
              <a href="#" className="panel-action-item" ng-click = "deleteById(instructor._id)">Delete</a>
            </li>            
          </ul>
        </div>

        <div className="panel-body">

          <div className="row mb16">
            <div className="col-sm-2">
              <img ng-src="{{instructor.picture}}" className="profile-photo">
            </div>
            <div className="col-sm-10">
              <div className="row mb8">
                <div className="col-sm-4">
                  <h5 className="mb0">Position</h5>
                  <h5 className="lightgray mb0">{{instructor.title}}</h5>
                </div>
                <div className="col-sm-4">
                  <h5 className="mb0">Permissions</h5>
                  <h5 className="lightgray mb0">{{instructor.permissions}}</h5>
                </div>
                <!-- <div className="col-sm-4">
                  <h5 className="mb0">Scheduled for</h5>
                  <h5 className="lightgray mb0">24 classNamees</h5>
                </div> -->
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <h5 className="mb0">Certifications</h5>
                  <h5 className="lightgray mb0">{{instructor.certifications}}</h5>
                </div>
                <!-- <div className="col-sm-4">
                  <h5 className="mb0">Current Rating</h5>
                  <h5 className="lightgray mb0">5/5</h5>
                </div> -->
                <div className="col-sm-4">
                </div>
              </div>              
            </div>    
          </div>

          <div className="row">
            <div className="col-sm-12">
              <h5 className="mb0">Instructor Bio</h5>
              <h5 className="lightgray mb0">{{instructor.bio}}</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}