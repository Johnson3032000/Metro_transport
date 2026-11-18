import React from 'react'

function Rough() {
  return (
    <div>


<div>
  {data.map((item) => (
    <article
      key={item.id}
      className="dcard my-3 row g-0 mx-0"
      style={{
        backgroundColor: item.background,
        borderLeft: `5px solid ${item.color}`
      }}
    >
      {/* Left: details */}
      <div className="col-12 col-lg-8 dcard__main">
        <h3
          className="dcard__title"
          style={{ color: item.color }}
        >
          {item.name}
        </h3>

        <p className="dcard__desc">
          {item.description}
        </p>

        <div className="dcard__meta d-flex flex-wrap">
          <span className="dcard__meta-item">
            <FiCalendar aria-hidden="true" />
            UPDATED: {item.updated_date}
          </span>

          <span className="dcard__meta-item">
            <FiHardDrive aria-hidden="true" />
            SIZE: {item.size}
          </span>
        </div>
      </div>

      {/* Right: included files */}
      <div className="col-12 col-lg-4 dcard__side">
        <h4
          className="dcard__side-title"
          style={{ color: item.color }}
        >
          <FiFileText aria-hidden="true" />
          INCLUDED FILES
        </h4>

        <div className="dcard__chips d-flex flex-wrap">
          {item.files.map((f) => (
            <span
              key={f}
              className="dcard__chip"
              style={{
                backgroundColor: item.background,
                color: item.color,
                border: `1px solid ${item.color}`
              }}
            >
              {f}
            </span>
          ))}
        </div>

        <a
          href={item.download_url}
          className="dcard__btn"
          download
          style={{
            backgroundColor: item.color,
            color: "#ffffff"
          }}
        >
          <FiDownload aria-hidden="true" />
          DOWNLOAD ZIP
        </a>
      </div>
    </article>
  ))}
</div>

      
    </div>
  )
}

export default Rough
