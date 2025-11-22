import { useState } from "react";
import booksData from "../../data/books.json";

export default function ShowList() {
  const [books, setBooks] = useState(booksData.books);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(""); // "create" | "edit"
  const [selected, setSelected] = useState({
    id: "",
    name: "",
    author: "",
    publisher: "",
    year: "",
    page: "",
    isbn: ""
  });

  const openCreate = () => {
    setMode("create");
    setSelected({
      id: "",
      name: "",
      author: "",
      publisher: "",
      year: "",
      page: "",
      isbn: ""
    });
    setShowModal(true);
  };

  const openEdit = (book) => {
    setMode("edit");
    setSelected(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (mode === "create") {
      const newBook = {
        ...selected,
        id: Date.now()
      };
      setBooks([...books, newBook]);
    } else if (mode === "edit") {
      setBooks(
        books.map((b) => (b.id === selected.id ? selected : b))
      );
    }
    closeModal();
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div className="container mt-5">

      {/* Title & Create Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📚 Book List</h2>
        <button className="btn btn-primary" onClick={openCreate}>
          + Add Book
        </button>
      </div>

      {/* Books Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>책 제목</th>
            <th>저자</th>
            <th>출판사</th>
            <th>출판년도</th>
            <th>페이지 수</th>
            <th>ISBN</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.year}</td>
              <td>{b.page}</td>
              <td>{b.isbn}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => openEdit(b)}
                >
                  수정
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteBook(b.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "#00000055" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  {mode === "create" ? "새 책 추가" : "책 정보 수정"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                {Object.keys(selected).map((key) =>
                  key === "id" ? null : (
                    <div className="mb-3" key={key}>
                      <label className="form-label">{key}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={key}
                        value={selected[key]}
                        onChange={handleChange}
                      />
                    </div>
                  )
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  취소
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  저장
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
