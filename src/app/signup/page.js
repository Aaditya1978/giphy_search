"use client";
import { useState } from "react";
import { Form, FloatingLabel, Card, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/form.module.scss";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setSubmitting(false);
      return;
    }

    axios
      .post("/api/signup", JSON.stringify(formData))
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
        setSubmitting(false);
      });
  };

  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.title}>Sign Up</Card.Title>
          <Form className={styles.form} onSubmit={handleSignup}>
            <FloatingLabel className={styles.label} label="Email email">
              <Form.Control
                type="email"
                name="email"
                className={styles.input}
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel className={styles.label} label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                className={styles.input}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel className={styles.label} label="Confirm Password">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FloatingLabel>
            {!submitting ? (
              <Button className={styles.button} type="submit">
                Submit
              </Button>
            ) : (
              <Button className={styles.button} type="submit" disabled>
                <ClipLoader color="#fff" size={20} /> Submitting...
              </Button>
            )}
          </Form>
          <Card.Text className={styles.text}>
            Already have an account?{" "}
            <Link href="/login">Login here</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </main>
  );
}
