open Jest;

describe("User", () => {
  let json = "{\"id\":\"1\",\"createdDate\":\"1525147200000\",\"name\":\"Test User\",\"email\":\"test@example.com\"}";
  let user: User.t = {
    id: "1",
    createdDate: "1525147200000",
    name: "Test User",
    email: "test@example.com",
  };
  describe("deserializing from json", () => {
    test("should deserialize if all fields are present", () => {
      open Expect;
      let decoded =
        json
        |> User.Decode.user
        |> (
          u =>
            switch (u) {
            | Js.Result.Ok(u') => Some(u')
            | Js.Result.Error(_e) => None
            }
        );
      expect(decoded) |> toEqual(Some(user));
    });
    test("should return errors if a field is missing", () => {
      open Expect;
      let json = "{\"id\":\"1\"}";
      let decoded =
        json
        |> User.Decode.user
        |> (
          u =>
            switch (u) {
            | Js.Result.Ok(_u) => None
            | Js.Result.Error(e) => Some(e)
            }
        );
      expect(decoded) |> toEqual(Some("Expected field 'createdDate'"));
    });
  });
  test("should serialize to json", () => {
    open Expect;
    let encoded = user |> User.Encode.user |> Json.stringify;
    expect(encoded) |> toEqual(json);
  });
});
