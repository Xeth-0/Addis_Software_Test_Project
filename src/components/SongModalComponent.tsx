import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Song } from "../store";
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
} from "../styles/SongModal.styles";

interface SongModalProps {
  song?: Song;
  isOpen: boolean;
  onClose: () => void;
  onSave: (song: Omit<Song, "id">) => void;
}

export const SongModalComponent: React.FC<SongModalProps> = ({
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
