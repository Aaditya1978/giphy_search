"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Card, Form, Button, Pagination, Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "../styles/page.module.scss";

export default function Home() {
  const router = useRouter();

  const [gifData, setGifData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [alert, setAlert] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    axios
      .get(`/api/verify`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .catch((error) => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  useEffect(() => {
    if (localStorage.getItem("favorites")) {
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
    } else {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowFavorites(false);
    setGifData([]);
    axios
      .get(`/api/giphySearch?searchTerm=${searchTerm}`)
      .then((response) => {
        setGifData(response.data.data);
        setTotalPages(response.data.data.length / 10);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePagination = (e, curr) => {
    e.preventDefault();

    if (curr === page) {
      return;
    }

    setPage(curr);
  };

  const handlePaginationPrev = (e) => {
    e.preventDefault();
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const handlePaginationNext = (e) => {
    e.preventDefault();
    if (page === totalPages) {
      return;
    }

    setPage(page + 1);
  };

  const handleShowFavorites = (e) => {
    e.preventDefault();
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setGifData(JSON.parse(localStorage.getItem("favorites")));
      setTotalPages(parseInt(JSON.parse(localStorage.getItem("favorites")).length / 10) + 1);
      setPage(1);
      setLoading(false);
    }else{
      setGifData([]);
      setTotalPages(0);
      setPage(1);
      setLoading(false);
    }
    
  };

  const handleSetFavorite = (e, gif) => {
    e.preventDefault();
    localStorage.setItem(
      "favorites",
      JSON.stringify([...JSON.parse(localStorage.getItem("favorites")), gif])
    );

    setFavorites([...JSON.parse(localStorage.getItem("favorites"))]);
  };

  const handleRemoveFavorite = (e, id) => {
    e.preventDefault();
    localStorage.setItem(
      "favorites",
      JSON.stringify(
        JSON.parse(localStorage.getItem("favorites")).filter(
          (favorite) => favorite.id !== id
        )
      )
    );

    setFavorites([...JSON.parse(localStorage.getItem("favorites"))]);
  };

  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <div className={styles.search}>
          <Form.Control
            className={styles.searchInput}
            type="text"
            placeholder="Article name or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {!loading ? (
            <Button onClick={handleSearch} className={styles.button}>
              Search
            </Button>
          ) : (
            <Button className={styles.button} disabled>
              <ClipLoader color="#fff" size={20} /> Loading...
            </Button>
          )}
        </div>

        <div className={styles.favorite}>
          <Button
            className={!showFavorites ? styles.button : styles.buttonActive}
            onClick={handleShowFavorites}
          >
            Favorites
          </Button>
        </div>

        {loading && (
          <ClipLoader className={styles.loader} color="#000" size={60} />
        )}
        {gifData.length > 0 && (
          <>
            <div className={styles.gifContainer}>
              {gifData.slice((page - 1) * 10, page * 10).map((gif) => (
                <div className={styles.gif} key={gif.id}>
                  <CopyToClipboard
                    text={gif.images.fixed_height.url}
                    onCopy={() => setAlert(true)}
                  >
                    <Image
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      width={200}
                      height={gif.images.fixed_height.height}
                    />
                  </CopyToClipboard>
                  <h3>
                    {gif.title.length > 10
                      ? gif.title.substring(0, 20) + "..."
                      : gif.title}
                  </h3>
                  <div className={styles.gifActions}>
                    <p>
                      @
                      {gif.username.length > 10
                        ? gif.username.substring(0, 10) + "..."
                        : gif.username}
                    </p>
                    <p>
                      {favorites.find((favorite) => favorite.id === gif.id) ? (
                        <AiFillStar
                          className={styles.starFill}
                          onClick={(e) => handleRemoveFavorite(e, gif.id)}
                        />
                      ) : (
                        <AiOutlineStar
                          className={styles.star}
                          onClick={(e) => handleSetFavorite(e, gif)}
                        />
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination size="lg" className={styles.pagination}>
              <Pagination.Prev onClick={handlePaginationPrev} />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  active={i + 1 === page}
                  onClick={(e) => handlePagination(e, i + 1)}
                  key={i + 1}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={handlePaginationNext} />
            </Pagination>
          </>
        )}
      </Card>
      {alert && (
        <Alert
          variant="success"
          onClose={() => setAlert(false)}
          dismissible
          className={styles.alert}
        >
          <Alert.Heading className={styles.alertHeading}>
            Success!
          </Alert.Heading>
          <p>The GIF URL has been copied to your clipboard.</p>
        </Alert>
      )}
    </main>
  );
}
