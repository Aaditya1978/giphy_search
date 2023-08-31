"use client";
import { useState } from "react";
import { Form, FloatingLabel, Card, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import styles from "../../styles/form.module.scss";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
      axios.post("/api/login", JSON.stringify(formData)).then((response) => {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }).catch((error) => {
        alert(error.response.data.message);
        router.push("/signup");
      });
  };

  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.title}>Login</Card.Title>
          <Form className={styles.form} onSubmit={handleLogin}>
            <FloatingLabel className={styles.label} label="Email email">
              <Form.Control
                type="email"
                className={styles.input}
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel className={styles.label} label="Password">
              <Form.Control
                type="password"
                className={styles.input}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            {!submitting ? (
              <Button className={styles.button} type="submit">
                Submit
              </Button>
            ) : (
              <Button className={styles.button} type="submit" disabled>
                <ClipLoader size={20} color="#fff" /> Submitting...
              </Button>
            )}
          </Form>

          <Card.Text className={styles.text}>
            Don&apos;t have an account?{" "}
            <Link href="/signup">Sign up here</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </main>
  );
}
