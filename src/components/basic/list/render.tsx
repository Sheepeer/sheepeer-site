import { Blog } from "@/components/pages/blogs";
import moment from "moment";
import Tag from "../tag";
import Space from "../space";
import styles from "./style.module.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Link from "next/link";
import { Button, Dialog, DialogActions } from "@mui/material";
import { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import Str2Dom from "../str2dom";
import { Edit, Delete } from "@mui/icons-material";

const SingleListItem = ({
  item,
  deletePost,
}: {
  item: Blog;
  deletePost: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles["single-list-item"]}>
      <div className={styles["text"]}>
        <div className={styles["info"]}>
          <Tag color={item.color}>{item.tag}</Tag>
          <div className={styles["date"]}>
            {moment(item.date).format("YYYY-MM-DD HH:mm")}
          </div>
        </div>
        <p className={styles["title"]}>{item.title}</p>
      </div>
      <Space className={styles["actions"]}>
        <Edit
          className={styles["edit"]}
          onClick={() =>
            (window.location.href = `/backstage/workspace?id=${item.id}`)
          }
        />
        <Delete className={styles["delete"]} onClick={() => setOpen(true)} />
      </Space>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent id="alert-dialog-title">{`确认删除文章：${item.title} ?`}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            再想想
          </Button>
          <Button
            onClick={() => deletePost(parseInt(item.id))}
            color="primary"
            variant="contained"
          >
            立刻删除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ListItem = ({
  item,
}: {
  item: Blog;
}) => {
  const imgSrc = item.content_html.match(/<img [^>]*>/)?.[0];
  return (
    <Link href={`/blog/${item.id}`}>
      <div className={styles["complex-list-item"]}>
        {imgSrc && (
          <div className={styles["img"]}>
            <Str2Dom str={imgSrc} domId={`imgId-${item.id}`} />
          </div>
        )}
        <div className={styles["text"]}>
          <div className={styles["info"]}>
            <Tag color={item.color}>{item.tag}</Tag>
            <div className={styles["date"]}>
              {moment(item.date).format('YYYY-MM-DD HH:mm')}
            </div>
          </div>
          <p className={styles["title"]}>{item.title}</p>
          <p className={styles["content"]}>{item.content}</p>
          <div className={styles["record"]}>
            <Space>
              <VisibilityOutlinedIcon className={styles["icon"]} />
              <div className={styles["watcher-count"]}>
                {item.watcher_count}
              </div>
            </Space>
          </div>
        </div>
        {/* {
          imgSrc &&
          <div className={styles['img']}>
            <Str2Dom
              str={imgSrc}
              domId={`imgId-${item.id}`} />
          </div>
        } */}
      </div>
    </Link>
  );
};

const renderListItem = (
  type: "list" | "single-list",
  item: Blog,
  deletePost?: (id: number) => void
) => {
  switch (type) {
    case "list":
      return <ListItem item={item} />;
    case "single-list":
      return <SingleListItem item={item} deletePost={deletePost!} />;
  }
};
export default renderListItem;
