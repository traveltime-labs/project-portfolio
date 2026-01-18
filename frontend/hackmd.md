# 建立

Step 1：建立 SSH 資料夾
mkdir -p ~/.ssh
chmod 700 ~/.ssh

Step 2：生成兩個 SSH key
ssh-keygen -t ed25519 -C "traveltime1221@github" -f ~/.ssh/id_ed25519_tt1221
passphrase 可以留空，也可以設定
輸入後會生成兩個檔案：
~/.ssh/id_ed25519_tt1221（私鑰）
~/.ssh/id_ed25519_tt1221.pub（公鑰）

ssh-keygen -t ed25519 -C "traveltime-labs@github" -f ~/.ssh/id_ed25519_ttlabs
同理，生成兩個檔案：
~/.ssh/id_ed25519_ttlabs（私鑰）
~/.ssh/id_ed25519_ttlabs.pub（公鑰）


Step 3：把 SSH key 加入 agent
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_tt1221
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_ttlabs


Step 4：設定 SSH config
nano ~/.ssh/config

貼上：
# traveltime1221
Host github-tt1221
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_tt1221
  AddKeysToAgent yes
  UseKeychain yes

# traveltime-labs
Host github-ttlabs
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_ttlabs
  AddKeysToAgent yes
  UseKeychain yes

存檔退出：
Ctrl + O → Enter → 存檔
Ctrl + X → 退出

設定權限
chmod 600 ~/.ssh/config

拷貝SSH
cat ~/.ssh/id_ed25519_ttlabs.pub
cat ~/.ssh/id_ed25519_tt1221.pub

將看到的整段SSH拷貝貼到github
登入 GitHub → Settings → SSH and GPG keys → New SSH key


Step 6：測試 SSH 連線
ssh -T git@github-tt1221
ssh -T git@github-ttlabs
Hi traveltime-labs! You've successfully authenticated, but GitHub does not provide shell access.

設定 repo remote
cd ~/workspace/repo-a
git remote set-url origin git@github-tt1221:traveltime1221/repo-a.git

cd ~/workspace/repo-b
git remote set-url origin git@github-ttlabs:traveltime-labs/repo-b.git





