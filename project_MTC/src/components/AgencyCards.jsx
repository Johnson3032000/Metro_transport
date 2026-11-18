
import mtc from "../assets/mtc_logo.jpg"
import south_rail_img from "../assets/suburban_logo.png"
import ctl from "../assets/cmrl_logo.png"

function AgencyCards() {

  const agencies = [
    {
      name: "SOUTHERN RAILWAYS",
      logo: mtc
    },
    {
      name: "METROPOLITAN TRANSPORT CORPORATION",
      logo: south_rail_img
    },
    {
      name: "CHENNAI METRO RAIL LTD.",
      logo: ctl
    }
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "100%",
        padding: "25px 20px",
        backgroundColor: "#ffffff",
        flexWrap: "wrap",
        gap: "30px"
      }}
    >
      {agencies.map((agency, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "250px",
            textAlign: "center"
          }}
        >

          {/* Circular Logo */}
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "1px solid #e0e0e0",
              boxShadow: "0px 3px 5px rgba(0,0,0,0.20)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              overflow: "hidden"
            }}
          >
            <img
              src={agency.logo}
              alt={agency.name}
              style={{
                width: "75%",
                height: "75%",
                objectFit: "contain"
              }}
            />
          </div>

          {/* Agency Name */}
          <h4
            style={{
              color: "#8985b4",
              fontSize: "14px",
              fontWeight: "600",
              marginTop: "20px",
              lineHeight: "22px",
              maxWidth: "220px"
            }}
          >
            {agency.name}
          </h4>

        </div>
      ))}
    </div>
  );
}

export default AgencyCards;
