import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { X } from "lucide-react";
import { Song } from "../store";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: #007AFF;
    color: white;
    
    &:hover {
      background: #0056CC;
    }
  `
      : `
    background: #f0f0f0;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
`;

interface SongModalProps {
  song?: Song;
  isOpen: boolean;
  onClose: () => void;
  onSave: (song: Omit<Song, "id">) => void;
}

export const SongModal: React.FC<SongModalProps> = ({
  song,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    year: new Date().getFullYear(),
    images: {
      large: "",
      medium: "",
      small: "",
    },
    previewUrl: "",
    duration: "",
  });

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        year: song.year,
        images: {
          large: song.images.large || "",
          medium: song.images.medium || "",
          small: song.images.small || "",
        },
        previewUrl: song.previewUrl || "",
        duration: song.duration,
      });
    } else {
      setFormData({
        title: "",
        artist: "",
        album: "",
        year: new Date().getFullYear(),
        images: {
          large: "",
          medium: "",
          small: "",
        },
        previewUrl: "",
        duration: "",
      });
    }
  }, [song, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{song ? "Edit Song" : "Add New Song"}</Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Artist</Label>
            <Input
              type="text"
              value={formData.artist}
              onChange={(e) => handleChange("artist", e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Album</Label>
            <Input
              type="text"
              value={formData.album}
              onChange={(e) => handleChange("album", e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Year</Label>
            <Input
              type="number"
              value={formData.year}
              onChange={(e) => handleChange("year", parseInt(e.target.value))}
              min="1900"
              max={new Date().getFullYear() + 10}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Thumbnail URL</Label>
            <Input
              type="url"
              value={formData.images.large}
              onChange={(e) => handleChange("images.large", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>

          <FormGroup>
            <Label>Duration</Label>
            <Input
              type="text"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="3:45"
              pattern="[0-9]+:[0-5][0-9]"
              required
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {song ? "Update" : "Add"} Song
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};
