import React from "react";
import fetch from "isomorphic-unfetch";
import moment from "moment";

class CacheManager extends React.Component {
  static async getInitialProps({ req }) {
    const res = await fetch("http://localhost:3000/caches/");
    const json = await res.json();
    return {
      files: json
    };
  }

  render() {
    console.log("pages/cacheManager this.props", this.props);
    const dateFormat = "ddd MMM, Do - HH:mm:ss";
    return (
      <div>
        <h1>Caches</h1>
        {this.props.files.map((file, index) => {
          return (
            <form key={index} action={`/delete/cache/${file.type}/${file.id}`}>
              <p>Filename: {file.filepath}</p>
              <p>Creation: {moment(file.creation).format(dateFormat)}</p>
              <p>
                Modification: {moment(file.modification).format(dateFormat)}
              </p>
              <button type="submit">Delete</button>
            </form>
          );
        })}
      </div>
    );
  }
}

export default CacheManager;
