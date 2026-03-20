/**
 * 文字列メッセージを配列に蓄積し、追加順で取得するクラス。
 * クラスメソッド（static）のみを定義する。
 * @see message-store-external-spec.md
 */
export class StringMessage {
  private static messages: string[] = [];

  /**
   * メッセージを末尾に追加する。
   * @param message 追加する文字列（空文字可）
   * @throws TypeError message が文字列でない場合
   */
  static addMessage(message: string): void {
    if (typeof message !== "string") {
      throw new TypeError("message must be a string");
    }
    StringMessage.messages.push(message);
  }

  /**
   * 蓄積済みメッセージを追加順の配列で返す。
   * 内部状態を保護するためコピー配列を返す。
   */
  static getMessages(): string[] {
    return [...StringMessage.messages];
  }
}
