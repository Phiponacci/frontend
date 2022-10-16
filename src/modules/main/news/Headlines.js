import * as React from "react";

import API_BASE_URL from "../../api";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewsTicker from "react-advanced-news-ticker";

function Headlines() {
  const [news, setNews] = React.useState(null);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/News/rss`)
      .then((res) => res.json())
      .then((_links) => {
        setNews(_links);
      })
      .catch((_) => alert("❌ERROR: news links not found!"));
    return () => {};
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid>
            <Avatar
              src="/logo.png"
              variant="square"
              sx={{ width: 50 * (4 / 3), height: 50, marginRight: 2 }}
            />
          </Grid>

          <Grid>
            <h5
              style={{
                color: "white",
                marginBottom: 2,
              }}
            >
              National Headlines
            </h5>
            {news != null && (
              <NewsTicker
                maxRows={1}
                duration={5000}
                style={{
                  listStyleType: "none",
                  padding: 0,
                }}
              >
                {news.map((item) => (
                  <div key={item.guid.toString()}>
                    <h6
                      className="hour"
                      style={{
                        color: "white",
                        display: "inline",
                      }}
                    >
                      {item.pubDate} |{" "}
                    </h6>
                    <h6
                      style={{
                        color: "white",
                        display: "inline",
                      }}
                    >
                      {item.title.cdataSection}
                    </h6>
                  </div>
                ))}
              </NewsTicker>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Headlines;
